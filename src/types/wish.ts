interface Wish {
   name:          string;
   list_name:     string;
   link:          string;
   imgs:          string[3];
   description:   string;
   price:         number;
   currency:      string;
   hide:          boolean;
};

export { Wish };