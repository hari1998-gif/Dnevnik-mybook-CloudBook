import React from "react";

function About() {
  return (
    <div className="container">
      <h1>About</h1>
      <p>
        Welcome to our diary app where you can store your thoughts and memories!
      </p>
      <p>
        This app allows you to create pages in your diary, login, sign up, and
        sign out.
      </p>
      <p>
        Your data is securely stored on the cloud using MongoDB with Mongoose,
        and you can access it anytime using your login credentials.
      </p>
      <p>
        Our application allows you to create and
        manage pages in your personal diary. You can securely store your
        thoughts, memories, and important moments in the cloud, ensuring that
        your data is always accessible. We have implemented a user
        authentication system, enabling you to create an account, log in, and
        log out.</p>
        <p> Your login credentials ensure that only you have access to your
        diary pages and information. Feel free to explore and express yourself
        without worrying about privacy and security. To power the cloud storage
        functionality, we have integrated our web app with MongoDB using
        Mongoose. MongoDB is a reliable and scalable NoSQL database, while
        Mongoose provides an elegant and intuitive way to interact with the
        database from our Node.js backend. Speaking of the backend, we have
        built our server using Node.js and Express.js. This robust combination
        allows for efficient handling of requests, smooth data flow, and
        seamless integration with the frontend. </p>
        <p>We ensure that your diary pages
        are stored and retrieved reliably from the cloud, providing a smooth
        user experience. With our app, you can write, save, and retrieve your
        diary pages anytime, anywhere. Your data is securely stored and always
        accessible with your login credentials. Begin your journey of
        documenting and preserving your precious moments with our diary app!
      </p>
    </div>
  );
}

export default About;
