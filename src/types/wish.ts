interface Wish {
   id:            number;
   name:          string;
   list_id:       number;
   link:          string;
   imgs:          Array<string>;
   description:   string;
   price:         number;
   currency:      string;
   hide:          boolean;
   email:         string;
};

export { Wish };