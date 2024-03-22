import { FIREBASE_DB } from "@/services/firebase";
import { 
   where,
   query,
   getDocs,
   collection,
} from "firebase/firestore";

interface User {
   id:               number;
   email:            string;
   nikname:          string;
   country:          string;
   profile_img_uri:  string;
}

const getUsers = async (email: string): Promise<User[]> => {
   try {
      const resp = await getDocs(
         query(
            collection(FIREBASE_DB, "users"), 
            where("email", "!=", email)
         )
      );
      return resp.docs.map(doc => doc.data() as User);
   } catch(err) {
      throw err; // FIXME
   }
}

export { 
   User,
   getUsers,
};