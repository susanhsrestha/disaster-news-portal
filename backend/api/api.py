from flask import Flask, jsonify, request
from nltk.corpus import stopwords
from flask_cors import CORS
import nltk
import string
import pickle
import re
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

ps = PorterStemmer()

app = Flask(__name__)
CORS(app)

cv = pickle.load(open('vectorizer.pkl', 'rb'))
cv2 = pickle.load(open('vectorizer2.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))
add_model = pickle.load(open('model2.pkl','rb'))

# Step 1: Data Preprocessing
def preprocess_text(text):
    # Clean the text
    text = re.sub(r'http\S+', '', text)  # Remove URLs
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove special characters and punctuation
    text = text.strip()  # Remove leading/trailing whitespaces

    # Tokenization
    tokens = word_tokenize(text)

    # Stopword removal
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token.lower() not in stop_words]

    # Lowercasing
    tokens = [token.lower() for token in tokens]

    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    # Join tokens back into a single string
    preprocessed_text = ' '.join(tokens)

    return preprocessed_text

def transform_text(text):
    text = text.lower()
    text = re.sub(r'http\S+', '', text)  # Remove URLs
    text = nltk.word_tokenize(text)

    y = []
    for i in text:
        if i.isalnum():
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        y.append(ps.stem(i))

    return " ".join(y)


# Define the disaster-related keywords
# disaster_keywords = ["disaster", "emergency", "catastrophe", "crisis"]

# Route for classifying the news text


@app.route("/api/classify/", methods=["POST"])
def classify_news():
    print(request.json)
    if "news" not in request.json:
        return jsonify({"error": "Missing 'news' field"}), 400

    news_text = request.json["news"]
    processed_news_text = transform_text(news_text)
    print(type(processed_news_text))
    vectorized_news_text = cv.transform([processed_news_text])
    print(type(vectorized_news_text))
    prediction = int(model.predict(vectorized_news_text)[0])

    if prediction == 0:
        return jsonify({
            "input_news": news_text,
            "preprocessed_news": processed_news_text,
            "is_disaster_related": prediction,
        }), 200
    else:
        processed_news_text=preprocess_text(news_text)
        vectorized_news_text = cv2.transform([processed_news_text])
        result = add_model.predict(vectorized_news_text)[0]
        return jsonify({
            "input_news": news_text,
            "preprocessed_news": processed_news_text,
            "is_disaster_related": prediction,
            "class":result
        }), 200

# Run the application
if __name__ == "__main__":
    app.run(port=5001, debug=True)
