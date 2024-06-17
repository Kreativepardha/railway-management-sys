import classNames from "classnames"
import useScrollTop from "../../hooks/use-scroll-top"

import { Button } from "./Button";
import { useLocation, useNavigate } from "react-router";


export const Navbar = () => {

    const scrolled = useScrollTop();
   
    return (
      <nav className={
        classNames
        ("z-50 bg-background   fixed top-0 flex items-center w-full p-4",
         scrolled && " shadow-sm shadow-yellow-400 dark:shadow-md-yellow-200"  )}>
          <div className="flex justify-around font-semibold w-full">
            <Button size="lg" variant="ghost">      
                Home
              </Button>
              <Button size="lg" variant="destructive" >      
                complaints
              </Button>
         
              <Button size="lg" >      
                TrainsBook
              </Button>
              <Button size="lg" >      
                Metro card  
              </Button>
                    
   
          </div>
      </nav>
    )
}