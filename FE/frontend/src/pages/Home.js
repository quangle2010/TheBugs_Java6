import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
const Home = () => {
    const namePage = "Trang Chủ";

    const [newProduct, setNewProduct] = useState([]);
    const [productM, setProductM] = useState([]);
    const [userC, setUserC] = useState([]);
    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/home");
            console.log(response.data.data.newProducts);
            console.log(response.data.data.producMaxId);
            console.log(response.data.data.newProducts);
            if (response.data.status == true) {

                setNewProduct(response.data.data.userComments);
                setProductM(response.data.data.producMaxId);
                setUserC(response.data.data.userComments);

            }

        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);




    return (
        <>

            <section className="welcome_bakery_area pink_cake_feature">
                <div className="container">
                    <div className="cake_feature_inner">
                        <div className="title_view_all">
                            <div className="float-left">
                                <div className="main_w_title">
                                    <h2>Sản phẩm nổi bật</h2>
                                </div>
                            </div>
                            <div className="float-right">
                                <a href="/products" className="pest_btn">
                                    Xem tất cả sản phẩm
                                </a>
                            </div>
                        </div>

                        {/* <div className="cake_feature_slider owl-carousel">
        {specialProducts.map(() => (
          <div className="item" >
            <div className="cake_feature_item">
              <div className="cake_feature_item_top">
                <a href={`/productdetail?id=${item.id}`} className="cake_img d-block">
                  <img
                    src={`/images/${item.images[0].name}`}
                    alt={item.name}
                  />
                </a>
              </div>
              <div className="cake_text">
                <h3 className="cake_text_name">{item.name}</h3>
                <h3 className="cake_text_price">
                  {new Intl.NumberFormat().format(item.price)} VND
                </h3>
                <div className="b-none">
                  <form action="/user/cart-user/add-to-cart" method="post">
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="currentUrl" value={currentUrl} />
                    <button className="btn btn-primary" type="submit">
                      Thêm vào giỏ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
                    </div>
                </div>
            </section>

            <div className="our_chef_area p_100">
                <div className="container" >
                    <div className="row our_chef_inner m-0">
                        <div className="col-lg-3">
                            <div className="chef_text_item">
                                <div className="main_title">
                                    <h2>Đầu bếp</h2>
                                    <p>
                                        Đầu bếp là nghệ sĩ trong bếp, sáng tạo ra những món ăn hấp dẫn. Họ không chỉ nấu nướng mà còn truyền cảm hứng cho thực khách qua hương vị và cách trình bày. Với đam mê và kỹ năng, đầu bếp biến mỗi bữa ăn thành một trải nghiệm ẩm thực độc đáo.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row our_chef_inner d-flex justify-content-center align-items-center">
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
                                            <h4 >Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
                                            <h4 >Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <section className="new_arivals_area p_100">
                <div className="container">
                    <div className="single_pest_title">
                        <h2>Bánh mới</h2>
                    </div>
                    <div className="row arivals_inner">
                        <div className="col-lg-6 col-sm-7">
                            <div className="arivals_chocolate">
                                <div className="arivals_pic">
                                    <img className="img-fluid" src="/img/cake-feature/arivals-pic.jpg" alt="Chocolate Crumble" />
                                </div>
                                <div className="arivals_text">
                                    <h4>{productM?.id}<span></span></h4>

                                    <a href="#">Mine cup</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            {/* <div className="arivals_slider owl-carousel">
          {newProducts.map((item) => (
            <div key={item.id} className="item">
              <div className="cake_feature_item">
                <div className="cake_feature_item_top">
                  <a href={`/productdetail?id=${item.id}`} className="cake_img d-block">
                    <img src={`/images/${item.images[0].name}`} alt={item.name} />
                  </a>
                </div>

                <div className="cake_text">
                  <h3 className="cake_text_name">{item.name}</h3>
                  <h3 className="cake_text_price">{item.price.toLocaleString()} VND</h3>
                  <div className="b-none">
                    <form action="/user/cart-user/add-to-cart" method="post">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="currentUrl" value={window.location.href} />
                      <button className="btn btn-primary" type="submit">Thêm vào giỏ</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}
                        </div>
                    </div>
                </div>
            </section>








            <section className="client_says_area p_100">
                <div className="container">
                    <div className="client_says_inner">
                        <div className="c_says_title">
                            <h2>Khách hàng nói gì?</h2>
                        </div>
                        {/* <div className="client_says_slider owl-carousel">
                        {data.userComments.length > 0 ? (
                            data.userComments.map((item, index) => (
                                <div className="item" key={index}>
                                    <div className="media">
                                        <div className="d-flex">
                                            <img src="/assets/img/client/client-1.png" alt="" />
                                            <h3>“</h3>
                                        </div>
                                        <div className="media-body">
                                            <p>{item.noted}</p>
                                            <h5>{item.user.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-comments">Chưa có bình luận nào</div>
                        )}
                    </div> */}
                    </div>
                </div>
            </section>

            <section className="bakery_video_area">
                <div className="container">
                    <div className="video_inner">
                        <h3>Hương Vị Thật Sự</h3>
                        <p>Bánh của chúng tôi chứa đựng tình cảm bùng cháy đến từ các đầu bếp</p>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Home;
