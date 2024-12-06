import React from 'react';
import { Link } from 'react-router-dom';

const Err = () => {
    return (
        <>
            {/* Error section */}
            <section className="error_area">
                <div className="container">
                    <div className="error_inner">
                        <div className="error_inner_text">
                            <h3>404</h3>
                            <h4>Oops! That page can’t be found</h4>
                            <h5>Sorry, but the page you are looking for does not exist</h5>
                            <Link to={"/home"} className="pink_btn">Go to home page</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Err;
