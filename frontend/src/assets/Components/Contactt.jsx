export default function Contactt() {
    return (
        <>


            {/* <!-- Header Start --> */}
            <div className="container-fluid header bg-white p-0">
                <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                    <div className="col-md-6 p-5 mt-lg-5">
                        <h1 className="display-5 animated fadeIn mb-4">Contact Us</h1>
                        <nav aria-label="breadcrumb animated fadeIn">
                            <ol className="breadcrumb text-uppercase">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                                <li className="breadcrumb-item text-body active" aria-current="page">Contact</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 animated fadeIn">
                        <img className="img-fluid" src="/assets/img/header.jpg" alt="" />
                    </div>
                </div>
            </div>
            {/* <!-- Header End --> */}


           


           {/* <!-- Contact Start --> */}
<div className="container-xxl py-5">
    <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
            <h1 className="mb-3">Get in Touch</h1>
            <p>
                Have questions about finding or listing a PG? We're here to help. Reach out to our team for assistance with bookings, listings, or general inquiries.
            </p>
        </div>
        <div className="row g-4">
            <div className="col-12">
                <div className="row gy-4">
                    <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                        <div className="bg-light rounded p-3">
                            <div className="d-flex align-items-center bg-white rounded p-3" style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}>
                                <div className="icon me-3" style={{ width: "45px", height: "45px" }}>
                                    <i className="fa fa-map-marker-alt text-primary"></i>
                                </div>
                                <span>PG-HUNT HQ, Chandigarh, India</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                        <div className="bg-light rounded p-3">
                            <div className="d-flex align-items-center bg-white rounded p-3" style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}>
                                <div className="icon me-3" style={{ width: "45px", height: "45px" }}>
                                    <i className="fa fa-envelope-open text-primary"></i>
                                </div>
                                <span>support@pghunt.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                        <div className="bg-light rounded p-3">
                            <div className="d-flex align-items-center bg-white rounded p-3" style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}>
                                <div className="icon me-3" style={{ width: "45px", height: "45px" }}>
                                    <i className="fa fa-phone-alt text-primary"></i>
                                </div>
                                <span>+91 9056698335</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <iframe
                    className="position-relative rounded w-100 h-100"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d175339.8128906148!2d77.0688991375!3d28.5272529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce39f4b048d97%3A0xb96e6c0dc7f3a98a!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1629198884078!5m2!1sen!2sin"
                    frameBorder="0"
                    style={{ minHeight: "400px", border: "0" }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                ></iframe>
            </div>
            <div className="col-md-6">
                <div className="wow fadeInUp" data-wow-delay="0.5s">
                    <p className="mb-4">
                        We'd love to hear from you. Whether you're a PG owner looking to list your property or a student searching for a stay, drop us a message below.
                    </p>
                    <form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                    <label htmlFor="name">Your Name</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                    <label htmlFor="email">Your Email</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                    <label htmlFor="subject">Subject</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: "150px" }}></textarea>
                                    <label htmlFor="message">Message</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
{/* <!-- Contact End --> */}


            {/* <!-- Back to Top --> */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>

        </>
    )
}