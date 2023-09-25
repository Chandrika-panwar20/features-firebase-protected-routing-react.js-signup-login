import { getFirestore, doc, setDoc } from "firebase/firestore";
import { userFirebase } from './InitializationFirebase'
import { getAuth,  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";

const db = getFirestore(userFirebase);
const auth = getAuth(userFirebase);

export const  singUpAuthantication = async(email, password) => {
return createUserWithEmailAndPassword(auth, email, password)
}

export const loginAuthantication = (email, password) => {
 return signInWithEmailAndPassword(auth, email, password)
.then( (res) => {
            return res.user.email
          })
          // .catch((error) =>{
          //   console.log("in singn in with login and password")
          // })
}

export const getCurrentUser = () =>
{  
  return new Promise( (resolve,reject) => {
    return onAuthStateChanged(auth, (user) => {
     if (user) {
       resolve(user)
     } else {
       reject("User is not signed in")
     }
   })
 })
}

export const setUserData = async(inputFields, uid) => { 
  try
  {
    const docRef = await setDoc(doc (db, "users", uid), {
      ...inputFields
      } )
  }
  catch(error){
        console.error("error inside the handleFirebase")
  }
}



  