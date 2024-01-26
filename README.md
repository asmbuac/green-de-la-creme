# Green de la Creme
~~This link leads to deployed site hosted by Caprover and GitLab.~~

~~Website Link: https://green-de-la-creme.gitlab.io/green-de-la-creme~~

**Update:** The site is no longer deployed. Please refer to our demo for a quick overview: https://youtu.be/pDg5d5ELCoE?si=r9EmF235H0B5U1Xm

**Team:**

* Shayne Buac - Software Developer
* Adam Azai - Software Developer
* Brandon Gomez - Software Developer
* Regan Tewksbury - Software Developer

## Design

Green de la Creme is a social media platform designed specifically for plant enthusiasts. The platform enables users to create accounts, connect with other plant owners, ask questions, share knowledge, and write blog posts.

The application is built on a microservice architecture, with the front and back end separated. The back end is built using FastAPI and includes a directory for the application. This directory includes a migrations directory, queries directory, routers directory, and a tests directory. The application also includes automatic table migrations written in the migrations folder.

The front end is built using React and Redux and has directories for blog components, forum components, and the Redux store.

The platform includes a forum where users can ask and answer questions, and a blog feature where users can write posts and comment on other's posts.

The platform is designed to provide an interactive and engaging experience for plant enthusiasts, enabling them to share knowledge and connect with others who share their passion for plants. The goal of Green de la Creme is to create a vibrant community of plant owners who can learn from each other and share their experiences, creating a more connected and informed plant community.

## Wireframe Diagram

<img src="/docs/wireframe.png" />

## How to Run the App

### Clone the Repository

1. In your terminal, ensure that you're in the directory you want to clone the project into.
2. In your terminal, type ``` git clone https://gitlab.com/green-de-la-creme/green-de-la-creme.git ```
3. Switch into the project directory by typing cd green-de-la-creme


### Running Project Locally

1. Type into your terminal ``` docker compose build ```
2. Type into your terminal ``` docker compose up ```

Once you have typed these commands into your terminal, you should see 4 containers up and running in your Docker Desktop. No volumes are necessary to create as the docker commands will automatically make these volumes for the containers,

### Viewing FastAPI Docs and React Front End

1. To view the FastAPI docs, please navigate to http://localhost:8000/docs in your internet browser.
2. To view the React-based front end, please navigate to http://localhost:3000 in your internet browser.
3. The front-end utilizes React and Redux, so the store and state can be viewed using React and Redux Google Chrome extensions in the JavaScript console.

## Routing and API Outline

Built with FastAPI, Green de la Creme allows you to view a list of blog posts, write and edit your own posts, and even leave comments and likes on posts that inspire you. You can also explore our forum section, where you can find a range of questions on all things plants. And if you're feeling knowledgeable, share your own question or reply to someone else's. Plus, you have the ability to edit and delete your own forum questions.

Built within each page of our front-end is a navigation bar to provide easy access for all features within our application. A complete breakdown of each front-end url is provided below.

#### React Routes

- **Home Page** `http://localhost:3000`
  - Landing page with information about the site, example blog posts, FAQ, and team information
- **Signup** `http://localhost:3000/signup`
  - Sign up for the Green de la Creme
- **Login** `http://localhost:3000/login`
  - Log into your account
- **List of Blogs** `http://localhost:3000/blogs`
  - View a list of all blogs that every user has created
  - Buttons for editing and deleting blogs if your account is the creator
  - Option to like and comment on blog posts, view blog comments, and edit or delete your comment
- **List of Forum Threads** `http://localhost:3000/forum`
  - View a list of all the forum threads that every user has created
- **Forum Thread Detail Page** `http://localhost:3000/forum/:id`
  - The detail view of one forum thread to view the answers other users have posted
  - Buttons for editing and deleting the thread if your account is the creator
  - Option to reply to forum questions with your answers and edit or delete your reply
- **Resources Page** `http://localhost:3000/resources`
  - Resources with external links for education on plant ownership and garden upkeep
- **About** `http://localhost:3000/about`
  - Under construction: coming soon!

#### Green_Creme Directory

Green de la Creme's backend microservice, located in the "green_creme" directory. We'll break it down step-by-step.

First  we have a "migrations" file which contains all the migration files for our SQL database. This includes a forum table, blog table, users table, forum replies table, and blog comments table.

In the "queries" directory, we have several repositories to handle all the CRUD functions for each of our tables. This includes an accounts repository for getting and creating accounts, a blogs repository for handling all of the CRUD functions for blogs, a blog comments repository for getting all blog comments and deleting blog comments, a forums repository for handling all CRUD functions for forums, and a forum replies repository for getting all forum replies and deleting forum replies. We also have a "pool.py" file to connect to our database.

Each repository has Pydantic models to define the structure of our data. For example, the Pydantic models for accounts include an `Error` class, a `DuplicateAccountError` class, an `AccountIn` class for creating an account, an `AccountOut` class for returning an account, and an `AccountOutWithPassword` class for returning an account with its hashed password.

Similarly, we have Pydantic models for blogs, blog comments, and forums that define the structure of our data. Each model has an `Error` class for handling errors, as well as an `In` class for creating data and an `Out` class for returning data.

Our "routers" file contains all the FastAPI endpoints for blogs, accounts, forums, blog comments, forum replies, as well as account functions such as login, logout, and signup.

And lastly, we have a "tests" directory containing unit tests for our blog and forum endpoints to ensure the accuracy of our code.

Together, all these components work seamlessly to create the ultimate social media site for plant owners.

### FastAPI Endpoints

##### Blogs

<details>
<summary markdown="span">GET /blogs - List of All Blog Posts</summary>

```
[
  {
    "id": 4,
    "title": "Plants That Like Shaded Areas",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/3718448/pexels-photo-3718448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "created_on": "2023-04-18T16:16:24.673221",
    "author_id": 1,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  },
  {
    "id": 3,
    "title": "Watering Schedule",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://www.pexels.com/photo/a-person-spraying-water-with-a-spray-bottle-5137558/",
    "created_on": "2023-04-10T16:42:45.837062",
    "author_id": 1,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  },
  {
    "id": 1,
    "title": "Plants for Interior Design",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/4503819/pexels-photo-4503819.jpeg?auto=compress&cs=tinysrgb&w=800",
    "created_on": "2023-04-10T16:41:47.231049",
    "author_id": 1,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  }
]
```

</details>

<details>
<summary markdown="span">GET /blogs/{blog_id} - Get One Blog Post</summary>

```
{
  "id": 3,
  "title": "Watering Schedule",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://www.pexels.com/photo/a-person-spraying-water-with-a-spray-bottle-5137558/",
  "created_on": "2023-04-10T16:42:45.837062",
  "author_id": 1,
  "username": "regan",
  "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
  "first": "regan",
  "last": "tewks"
}
```

</details>

<details>
  <summary markdown="span">POST /blogs - Create a Blog Post</summary>

  ##### Input:

  ```
  {
  "title": "Best Plants for Office Spaces?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
  ```

  ##### Output:

  ```
{
  "id": 2,
  "title": "Best Plants for Office Spaces?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "created_on": "2023-04-28T16:52:45.609069",
  "author_id": 1
}
```

</details>

<details>
  <summary markdown="span">PUT /blogs/{blog_id} - Edit a Blog Post </summary>

  ##### Input:

  ```
  {
  "title": "3 Best Plants for Home Office Spaces?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
  ```

  ##### Output:

  ```
{
  "id": 2,
  "title": "3 Best Plants for Office Spaces?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "created_on": "2023-04-28T16:52:45.609069",
  "author_id": 1
}
```

</details>

<details>
  <summary markdown="span">DELETE /blogs/{blog_id} - Delete a Blog Post </summary>

  ##### Input:

  ```
  {
  "id": 2
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Forum Threads

<details>
<summary markdown="span">GET /forum - List of All Forum Threads</summary>


```
[
  {
    "id": 9,
    "title": "Fun Watering Schedules for Plants?",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/5137558/pexels-photo-5137558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "author_id": 1,
    "created_on": "2023-04-20T11:48:32.085243",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  },
  {
    "id": 7,
    "title": "Good Starter Plants? ",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/4505447/pexels-photo-4505447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "author_id": 1,
    "created_on": "2023-04-20T11:31:55.414440",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  },
  {
    "id": 4,
    "title": "Low Maintainance Office Plants",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/4153232/pexels-photo-4153232.jpeg?auto=compress&cs=tinysrgb&w=800",
    "author_id": 1,
    "created_on": "2023-04-10T16:44:44.030373",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  }
]
```

</details>

<details>
<summary markdown="span">GET /forum/{forum_id} - Get One Forum Thread</summary>

  ```
  {
    "id": 9,
    "title": "Fun Watering Schedules for Plants?",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/5137558/pexels-photo-5137558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "author_id": 1,
    "created_on": "2023-04-20T11:48:32.085243",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  }
  ```

</details>

<details>
  <summary markdown="span">POST /forum - Create a Forum Thread</summary>

   ##### Input:

  ```
  {
  "title": "Best Plants for Shaded House Corners?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
  ```

  ##### Output:

  ```
  {
  "title": "Best Plants for Shaded House Corners?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  "author_id": 1,
  "created_on": "2023-04-20T11:48:32.085243",
  "username": "regan",
  "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  }
  ```

</details>

<details>
  <summary markdown="span">PUT /forum/{forum_id} - Edit a Forum Thread</summary>

  ##### Input:

  ```
  {
  "title": "Best Plants for Shaded Apartment Corners?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
  ```

  ##### Output:

  ```
  {
  "title": "Best Plants for Shaded Apartment Corners?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  "author_id": 1,
  "created_on": "2023-04-20T11:48:32.085243",
  "username": "regan",
  "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  }
  ```

</details>

<details>
  <summary markdown="span">DELETE /Forum/{forum_id} - Delete a Forum Thread </summary>

  ##### Input:

  ```
  {
  "id": 9
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Blog Comments

<details>
<summary markdown="span">GET /comments - List of All Comments for One Blog </summary>
<br>


```
[
  {
    "id": 1,
    "author_id": 1,
    "blog_id": 4,
    "response": "Look at this cute lil snake plant!! 🐍🌿😍",
    "image": null,
    "created_on": "2023-04-20T14:58:30.203218",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  },
  {
    "id": 2,
    "author_id": 1,
    "blog_id": 4,
    "response": "Wow! Adorable 🥰🥰",
    "image": null,
    "created_on": "2023-04-20T14:59:01.381381",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  }
]
```

</details>

<details>
<summary markdown="span">POST /comments - Create a Blog Comment </summary>
<br>

##### Input:

```
{
  "response": "Wow, so cool!",
  "image": "leaf.png",
  "blog_id": 4
}
```

##### Output:

```
{
  "id": 9,
  "author_id": 1,
  "blog_id": 4,
  "response": "Wow, so cool!",
  "image": "leaf.png",
  "created_on": "2023-04-27T17:47:56.288824"
}
```

</details>

<details>
<summary markdown="span">PUT /comments/{comment_id} - Update a Blog Comment </summary>
<br>

##### Input:

```
{
  "response": "Wow, so cool! I love that!",
  "image": "leafwithheart.png"
}
```

##### Output:

```
{
  "id": 9,
  "author_id": 1,
  "blog_id": 4,
  "response": "Wow, so cool! I love that!",
  "image": "leafwithheart.png",
  "created_on": "2023-04-27T17:47:56.288824"
}
```

</details>

<details>
<summary markdown="span">DELETE /comments/{comment_id} - Delete a Blog Comment </summary>
<br>

 ##### Input:

  ```
  {
  "id": 2
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Forum Replies

<details>
<summary markdown="span">GET /replies - List of All Forum Replies</summary>


```
[
  {
    "id": 4,
    "author_id": 1,
    "forum_id": 1,
    "answer": "Try a ZZ plant! They're pretty cute, too!",
    "image": "zzplant.png",
    "created_on": "2023-04-25T15:01:40.121767",
    "rating": 0,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "Regan",
    "last": "Tewksbury"
  },
  {
    "id": 3,
    "author_id": 1,
    "forum_id": 1,
    "answer": "Maybe try some bamboo",
    "image": "bamboo.png",
    "created_on": "2023-04-25T15:00:49.268921",
    "rating": 0,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "Regan",
    "last": "Tewksbury"
  },
  {
    "id": 2,
    "author_id": 1,
    "forum_id": 1,
    "answer": "Have you tried a snake plant?",
    "image": "snakeplant.png",
    "created_on": "2023-04-25T14:59:42.317108",
    "rating": 0,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "Regan",
    "last": "Tewksbury"
  }
]
```

<details>
<summary markdown="span">GET /replies/{reply_id} - Get One Forum Reply</summary>

```
{
  "id": 4,
  "author_id": 1,
  "forum_id": 1,
  "answer": "Try a ZZ plant! They're pretty cute, too!",
  "image": "zzplant.png",
  "created_on": "2023-04-25T15:01:40.121767",
  "rating": 0,
  "username": "regan",
  "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
  "first": "Regan",
  "last": "Tewksbury"
}
```

</details>
</details>

<details>
  <summary markdown="span">POST /replies - Create a Forum Reply </summary>

  ##### Input:

  ```
  {
    "forum_id": 1,
    "answer": "Try a ZZ plant! They're pretty cute, too!",
    "image": "zzplant.png",
    "rating": 0
  }
  ```

  ##### Output:

  ```
  {
  "id": 9,
  "author_id": 1,
  "forum_id": 2,
  "answer": "Try a ZZ plant! They're pretty cute, too!",
  "image": "zzplant.png",
  "created_on": "2023-04-28T16:52:46.160412",
  "rating": 0
  }
  ```

</details>

<details>
  <summary markdown="span">PUT /replies/{reply_id} - Edit a Forum Reply </summary>

  ##### Input:

  ```
  {
    "forum_id": 1,
    "answer": "Try a ZZ plant! They're really cute, too!",
    "image": "zzplant.png",
    "rating": 0
  }
  ```

  ##### Output:

  ```
  {
  "id": 9,
  "author_id": 1,
  "forum_id": 2,
  "answer": "Try a ZZ plant! They're really cute, too!",
  "image": "zzplant.png",
  "created_on": "2023-04-28T16:52:46.160412",
  "rating": 0
  }
  ```

</details>

<details>
<summary markdown="span">DELETE /replies/{reply_id} - Delete a Forum Reply </summary>
<br>

 ##### Input:

  ```
  {
  "id": 2
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Blog Likes

<details>
<summary markdown="span">GET /likes - List of All Likes For One Blog</summary>

<br>


```
[
  {
    "id": 12,
    "account_id": 1,
    "blog_id": 4,
    "username": "sbshayne"
  },
  {
    "id": 13,
    "account_id": 2,
    "blog_id": 4,
    "username": "iluvplants"
  }
]
```

</details>

<details>
<summary markdown="span">POST /likes - Create a Blog Like</summary>

<br>

Parameter: `blog_id` (integer)

##### Input:

```
{
  "id": 15,
  "account_id": 1,
  "blog_id": 4
}
```
##### Output:

  ```
  {
    "id": 15,
    "account_id": 1,
    "blog_id": 4,
    "username": "sbshayne"
  }
  ```

</details>

<details>
<summary markdown="span">DELETE /likes/{like_id} - Delete a Blog Like</summary>

<br>

##### Input:

  ```
  {
  "id": 15
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Accounts

<details>
<summary markdown="span">POST /api/accounts - Create an Account</summary>

```
{
  "first": "name",
  "last": "name",
  "username": "username",
  "email": "name@email.com",
  "password": password"
}
```
</details>
