import { 
   query, 
   where, 
   getDocs, 
   collection,
} from "firebase/firestore";
import { FIREBASE_DB } from "@/services/firebase";

interface Wish {
   id:            number;
   name:          string;
   list_id:       number;
   list_name:     string;
   link:          string;
   imgs:          Array<string>;
   description:   string;
   price:         number;
   currency:      string;
   hide:          boolean;
   email:         string;
};

const getWishes = async (email: string): Promise<Wish[]> => {
   try {
      const resp = await getDocs(
         query(
            collection(FIREBASE_DB, "wishes"), 
            where("email", "==", email)
         )
      );
      return resp.docs.map(doc => doc.data() as Wish);
   } catch(err) {
      throw err; // FIXME
   }
}

const getWishByID = async (id: number): Promise<Wish | undefined> => {
   try {
      const resp = await getDocs(
         query(
            collection(FIREBASE_DB, "wishes"), 
            where("id", "==", id),
         )
      );

      if(!resp.empty) {
         return resp.docs[0].data() as Wish;
      }

      return undefined;
   } catch(err) {
      throw err; // FIXME
   }
}

export { 
   Wish,
   getWishes,
   getWishByID,
};