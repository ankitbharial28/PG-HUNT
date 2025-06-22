import { Link } from "react-router-dom"
export default function Navbar(){
    return(
        <>
         {/* <!-- Navbar Start --> */}
         <div className="container-fluid nav-bar bg-transparent">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                    <a href="index.html" className="navbar-brand d-flex align-items-center text-center">
                        <div className="icon p-2 me-2">
                            <img className="img-fluid" src="/assets/img/icon-deal.png" alt="Icon" style={{ width: "30px", height: "30px" }} />
                        </div>
                        <h1 className="m-0 text-primary">PG-HUNT</h1>
                    </a>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto">
                            <Link to={'/'}>
                            <a href="" className="nav-item nav-link ">Home</a>
                            </Link>

                            <Link to={'/About'}>
                                <a href="" className="nav-item nav-link">About</a>
                            </Link>

                            {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Property</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <Link to={'/PropertyList'}>
                                    <a href="" className="dropdown-item">Property List</a>
                                    </Link>
                                    <Link to={'/PropertyType'}>
                                    <a href="" className="dropdown-item">Property Type</a>
                                    </Link>
                                    <Link to={'/PropertyAgent'}>
                                    <a href="" className="dropdown-item">Property Agent</a>
                                    </Link>
                                </div>
                            </div> */}
                            {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                    <a href="404.html" className="dropdown-item">404 Error</a>
                                </div>
                            </div> */}
                            <Link to={'/Contactt'}>
                            <a href="" className="nav-item nav-link">Contact</a>
                            </Link>
                        </div>
                        <Link to={'/SignUp'} className="btn btn-primary px-3 d-none d-lg-flex" style={{
                            marginRight:"20px"
                        }}>
                       Sign Up
                        </Link>
                        <Link to={'/login'} className="btn btn-primary px-3 d-none d-lg-flex">
                        Login
                        </Link>
                    </div>
                </nav>
            </div>
            {/* <!-- Navbar End --> */}

           
        </>
    )
}