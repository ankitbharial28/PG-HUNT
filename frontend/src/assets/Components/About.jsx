export default function About(){
    return(
        <>
         {/* <!-- Header Start --> */}
        <div className="container-fluid header bg-white p-0">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div className="col-md-6 p-5 mt-lg-5">
                    <h1 className="display-5 animated fadeIn mb-4">About Us</h1> 
                        <nav aria-label="breadcrumb animated fadeIn">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item text-body active" aria-current="page">About</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-md-6 animated fadeIn">
                    <img className="img-fluid" src="assets/img/header.jpg" alt=""/>
                </div>
            </div>
        </div>
        {/* <!-- Header End --> */}




         {/* <!-- About Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="about-img position-relative overflow-hidden p-5 pe-0">
                                <img className="img-fluid w-100" src="assets/img/about.jpg" />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="mb-4">#1 Platform to Find Your Ideal PG Accommodation</h1>
                            <p className="mb-4">Looking for a safe, affordable, and comfortable Paying Guest space? PG Finder makes it easy to discover verified PGs in your preferred city. Simplify your search and move in with confidence.</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Verified listings with photos and details</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Affordable options for students and professionals</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Quick and easy booking process</p>
                            <a className="btn btn-primary py-3 px-5 mt-3" href="">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- About End --> */}

                {/* <!-- Back to Top --> */}
        <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>

        </>
    )
}