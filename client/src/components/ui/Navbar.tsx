import classNames from "classnames"
import useScrollTop from "../../hooks/use-scroll-top"

import { Button } from "./Button";


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
                Trains
              </Button>
              <Button size="lg" >      
                Metro card  
              </Button>
              <Button size="lg" variant="secondary" className="bg-black text-white text-primary-foreground h-11 rounded-md px-8   hover:bg-yellow-400"  >      
              Login
              </Button>
   
          </div>
      </nav>
    )
}