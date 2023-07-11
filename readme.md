# Disaster News Portal

Disaster News Portal is a web application designed to provide real-time updates and news regarding disasters happening around Nepal. It aims to keep users informed about ongoing disasters, their impact, and relief efforts. This README provides an overview of the project structure and instructions for setting up and running the application.

## Features

- Real-time updates: The portal fetches and displays the latest news and updates related to disasters from reliable sources.
- Disaster details: Users can view detailed information about specific disasters, including their causes, locations, and impact.
- Relief efforts: The portal highlights ongoing relief efforts and provides information on how users can contribute or support the affected areas.
- User registration and authentication: Users can create accounts, log in, and personalize their experience on the portal.

## Project Structure

The repository consists of two main folders:

1. **frontend**: This folder contains the frontend code for the Disaster News Portal. It is built using modern web technologies such as ReactJS. The frontend interacts with the backend to fetch and display data to the users.

2. **backend**: The backend folder contains the server-side code for the Disaster News Portal. It is built using a backend framework (e.g., Node.js and Flask) and handles requests from the frontend. The backend interacts with external APIs or databases to fetch and process data before sending it back to the frontend.

## Getting Started

To set up the Disaster News Portal locally, follow these steps:

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/iamrohitt/news
```

2. Set up the backend:

- Navigate to the `backend` folder.

```
cd backend/
```

- Install the required dependencies using the package managers.

```js
npm install
```

```python
pip install -r requirements.txt
```

- Configure the backend to connect to the necessary APIs or databases. You may need to provide API keys or credentials if applicable.
- Run the Model API by navigating to `api` folder and using

```python
python api.py
```

- Start the backend node server.

```js
npm start
```

#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TOKEN_KEY`

3. Set up the frontend:

- Navigate to the `frontend` folder.

```
cd frontend/
```

- Install the required dependencies using the package managers.

```
npm install
```

- Ensure that the frontend can communicate with the backend server by updating any necessary endpoint URLs.
- Start the frontend server.

```js
npm start
```

4. Access the Disaster News Portal:

- Open a web browser and visit the URL where the frontend is hosted.
- Explore the various features and functionalities of the portal.
- Register an account or log in to personalize your experience.

## Contributing

Contributions to the Disaster News Portal are welcome! If you find any bugs, have suggestions for improvements, or would like to add new features, please open an issue or submit a pull request on the GitHub repository.

When contributing, please adhere to the existing code style and follow the repository's guidelines.

## Contact

##### If you have any questions, suggestions, or feedback, you can reach out to the project maintainers at [bhandari.rabinas11@gmail.com](mailto:bhandari.rabinas11@gmail.com), [rohitpaswan85@gmail.com](mailto:rohitpaswan85@gmail.com), [sulav.adk.7@gmail.com](mailto:sulav.adk.7@gmail.com), [thesusanshrestha@gmail.com](mailto:thesusanshrestha@gmail.com)

---

Thank you for using the Disaster News Portal! Stay informed and stay safe.
