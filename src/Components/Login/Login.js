import React, { useContext, useState } from "react";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: '',
    photo: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } }; 

  var provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(displayName, email, photoURL);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false
        };
        setUser(signedOutUser);
      })
      .catch((err) => {});
  };

  const changeHandler = (event) => {
    let isLoginValid;
    if (event.target.name === 'email') {
        isLoginValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
        const isPasswordValid = event.target.value.length > 6;
        const passwordWithNum = /\d{1}/.test(event.target.value);
        isLoginValid = isPasswordValid && passwordWithNum;
    }
    if (isLoginValid) {
        const newUserInfo = { ...user };
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);
    }
}

  const submitHandler = (event) => {
      if (user.email && user.password) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then( res => { 
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
         const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
      }
      event.preventDefault();
        }

  return (
    <div className="login-form-div">
        <div className="login-form-div">
      <form className="submit-Login submit-form" onSubmit={submitHandler}>
                <h3 className="mt-4 mb-2">Login</h3>
                <input type="text" className="mt-3 input-box" onBlur={changeHandler} name="email" placeholder="Email Address" required /><br></br>
                <input type="password" className="mt-3 input-box" onBlur={changeHandler} name="password" placeholder="Enter Password" required /><br></br>
                <input type="submit" className="mt-3 submit-btn mb-3" value="Login" />
                <p>Forgot password?</p>
            </form>
            <h4 style={{color: 'red'}}>{user.error}</h4>
            { user.success && <h4 style={{color: 'green'}}>Account Created Successfully</h4>}
            </div>
      {user.isSignedIn ? (
        <button className="submit-btn" onClick={handleSignOut}>
          {" "}
          Sign out{" "}
        </button>
      ) : (
        <button className="submit-btn" onClick={handleSignIn}>
          {" "}
          Sign in with Goggle{" "}
        </button>
      )}
      {user.isSignedIn && <p>Welcome, {user.name}</p>}
      
    </div>
  );
};

export default Login;

// firebase.initializeApp(firebaseConfig);

// const Form = () => {
//     const [user, setUser] = useState({
//         isSignedIn: false,
//         name: '',
//         email: '',
//         password: '',
//         photo: ''
//     })

//     const googleProvider = new firebase.auth.GoogleAuthProvider();
//     const fbProvider = new firebase.auth.FacebookAuthProvider();
//     const signInHandler = () => {
//         firebase.auth().signInWithPopup(googleProvider)
//             .then(res => {
//                 const { displayName, photoURL, email } = res.user;
//                 const signedInUser = {
//                     isSignedIn: true,
//                     name: displayName,
//                     email: email,
//                     photo: photoURL
//                 }
//                 setUser(signedInUser);
//             })
//             .catch(error => {
//                 console.log(error);
//                 console.log(error.message);
//             })
//     }

//     const fbSignInHandler = () => {
//         firebase
//             .auth()
//             .signInWithPopup(fbProvider)
//             .then((result) => {
//                 /** @type {firebase.auth.OAuthCredential} */
//                 var credential = result.credential;

//                 // The signed-in user info.
//                 var user = result.user;
//                 console.log('fb user', user);

//                 // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//                 var accessToken = credential.accessToken;

//                 // ...
//             })
//             .catch((error) => {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // The email of the user's account used.
//                 var email = error.email;
//                 // The firebase.auth.AuthCredential type that was used.
//                 var credential = error.credential;

//                 // ...
//             });
//     }

//     const signOutHandler = () => {
//         firebase.auth().signOut()
//             .then(res => {
//                 const signedOutUser = {
//                     isSignedIn: false,
//                     name: '',
//                     email: '',
//                     photo: ''
//                 }
//                 setUser(signedOutUser);
//                 console.log(res);
//             })
//             .catch(error => {
//                 // An error occurred
//             })
//     }

//     const changeHandler = (event) => {
//         let isFormValid;
//         if (event.target.name === 'email') {
//             isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
//         }
//         if (event.target.name === 'password') {
//             const isPasswordValid = event.target.value.length > 6;
//             const passwordWithNum = /\d{1}/.test(event.target.value);
//             isFormValid = isPasswordValid && passwordWithNum;
//         }
//         if (isFormValid) {
//             const newUserInfo = { ...user };
//             newUserInfo[event.target.name] = event.target.value;
//             setUser(newUserInfo);
//         }
//     }

//     const submitHandler = () => {

//     }


//     return (
//         <div className="login-form-div mt-5">
//             <form className="submit-form" onSubmit={submitHandler}>
//                 <h3 className="mt-4 mb-2">Login</h3>
//                 <input type="text" className="mt-3 input-box" onBlur={changeHandler} name="email" placeholder="Email Address" required /><br></br>
//                 <input type="password" className="mt-3 input-box" onBlur={changeHandler} name="password" placeholder="Enter Password" required /><br></br>
//                 <input type="submit" className="mt-3 submit-btn mb-3" value="Login" />
//                 <p>Forgot password?</p>
//             </form>
//             <br></br>
//             <p>Or</p>

//             {
//                 user.isSignedIn ? <button onClick={signOutHandler} className="btn btn-danger">Sign-out</button> :
//                     <button onClick={signInHandler} className="btn btn-danger">Sign-in using Email</button>
//             }
//             <br></br>
//             {
//                 <button onClick={fbSignInHandler} className="btn btn-primary mt-4">Sign in using Facebook</button>
//             }
//             <br></br>
//             {
//                 user.isSignedIn && <h3>Welcome, {user.name}</h3>
//             }

//         </div>
//     );
// };

// export default Form;
