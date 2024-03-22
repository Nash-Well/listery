import { FIREBASE_DB } from "@/services/firebase";
import { 
   where,
   query, 
   getDocs, 
   collection, 
} from "firebase/firestore";

interface List {
   id:      number;
   emoji:   string;
   title:   string;
   date:    string;
   private: boolean;
   email:   string;
};

// TODO: implement it as a generic function
const getLists = async (email: string): Promise<List[]> => {
   try {
      const resp = await getDocs(
         query(
            collection(FIREBASE_DB, "list"), 
            where("email", "==", email)
         )
      );
      return resp.docs.map(doc => doc.data() as List);
   } catch(err) {
      throw err; // FIXME
   }
}

export { 
   List,
   getLists,
};