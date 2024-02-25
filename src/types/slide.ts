interface Slide {
   title:         string;
   description:   string;
   required:      boolean;
   icon:          string;
   error_title?:  string;
   placeholder?:  string;
   field_name?:   string;
}

export { Slide };