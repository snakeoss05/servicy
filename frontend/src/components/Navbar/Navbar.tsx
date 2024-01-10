import { useState, useEffect } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import Notifications from "../notifications/Notifications";
export default function Navbar() {
  const [toggle, settoggle] = useState(false);

  const [navbarScroll, setNavbarScroll] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 400) {
        setNavbarScroll(false);
      } else {
        setNavbarScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function singout() {
    dispatch(logout());
  }

  return (
    <header
      id="Navbar"
      style={{
        backgroundColor: navbarScroll ? "#333" : "#060606",
        padding: "10px",
        paddingTop: "15px",
        boxShadow: navbarScroll
          ? "box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          : "none",
      }}>
      <div className="logo">
        <Link to="/">
          {" "}
          <img src="../../assets/log3.png" className="logod" alt="logo" />
          <img src="../../assets/logmobile.png" className="logom" alt="logom" />
        </Link>
      </div>
      <nav id="menu">
        <div className="nomenu">
          <div>
            <Link to="/">الصفحة رئيسية</Link>
          </div>
        </div>
        <div className="menu-item ">
          <div className="menu-text">
            <a href="#">الخدمات</a>
          </div>
          <div className="sub-menu double">
            <div className="icon-box  ">
              <div className="icon">
                <i className="fa-solid fa-comments-dollar"></i>
              </div>
              <div className="text">
                <div className="title">التجار</div>
              </div>
            </div>
            <div className="icon-box  ">
              <Link to="/services/technicien">
                <div className="icon">
                  <i className="fa-solid fa-wrench"></i>
                </div>

                <div className="text">
                  {" "}
                  <div className="title">تقني صيانة</div>
                </div>
              </Link>
            </div>
            <div className="icon-box  ">
              <div className="icon">
                <i className="fa-solid fa-broom"></i>
              </div>
              <div className="text">
                <div className="title">خدمات منزلية</div>
              </div>
            </div>
            <div className="icon-box  ">
              <Link to="/services/loyer">
                <div className="icon">
                  <i className="fa-solid fa-house"></i>
                </div>
                <div className="text">
                  <div className="title">كراء</div>
                </div>
              </Link>
            </div>
            <div className="icon-box  ">
              <div className="icon">
                <i className="fa-solid fa-person-digging"></i>
              </div>
              <div className="text">
                <div className="title">بناء</div>
              </div>
            </div>
            <div className="icon-box  ">
              <div className="icon">
                <i className="fa-solid fa-chalkboard-user"></i>
              </div>
              <div className="text">
                <div className="title">تعليم</div>
              </div>
            </div>
            <div className="sub-menu-holder" />
          </div>
        </div>
        <div className="menu-item highlight">
          <div className="menu-text">
            <a href="#">الدعم الفني</a>
          </div>
          <div className="sub-menu triple">
            <div className="icon-box flat"></div>
            <div className="icon-box flat"></div>
          </div>
        </div>
        <div className="menu-item">
          <div className="menu-text">
            <a href="#">التواصل</a>
          </div>
          <div className="sub-menu">
            <div className="icon-box">
              <div className="icon">
                <i className="far fa-satellite" />
              </div>
              <div className="text">
                <div className="title">
                  Forum <i className="far fa-arrow-right" />
                </div>
                <div className="sub-text">Join our passionate community.</div>
              </div>
            </div>
            <div className="icon-box">
              <div className="icon">
                <i className="fab fa-twitter-square" />
              </div>
              <div className="text">
                <div className="title">
                  Twitter <i className="far fa-arrow-right" />
                </div>
                <div className="sub-text">Follow us on twitter.</div>
              </div>
            </div>
            <div className="icon-box">
              <div className="icon">
                <i className="fab fa-twitch" />
              </div>
              <div className="text">
                <div className="title">
                  Live Stream <i className="far fa-arrow-right" />
                </div>
                <div className="sub-text">We stream content every day.</div>
              </div>
            </div>
            <div className="sub-menu-holder" />
          </div>
        </div>
        <div id="sub-menu-container">
          <div id="sub-menu-holder">
            <div id="sub-menu-bottom"></div>
          </div>
        </div>
      </nav>
      <div className="rightNav">
        {isAuthenticated ? (
          <>
            <Link to="/login" className="list">
              <i
                className="fa-solid fa-person-walking-arrow-right"
                onClick={singout}></i>
            </Link>

            <Link to="/profile" className="list">
              {" "}
              {user.profileimg ? (
                <img
                  src={
                    user.profileimg
                      ? user.profileimg
                      : "https://img.icons8.com/bubbles/100/000000/user.png"
                  }
                  alt="profileimg"
                  className="profielimg"
                />
              ) : (
                <i className="fa-regular fa-user list" />
              )}
            </Link>
            <a href="#" className="list">
              <Notifications />
            </a>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login" onClick={() => settoggle(false)}>
                تسجيل الدخول
              </button>
            </Link>
            <Link to="/signup">
              <button className="signup" onClick={() => settoggle(false)}>
                {" "}
                إنشاء حساب{" "}
              </button>
            </Link>
          </>
        )}
      </div>
      <div className="sideNav">
        <a
          href="#menu"
          id="toggle"
          className={`${toggle && "on"}`}
          onClick={() => settoggle(!toggle)}>
          <span></span>
        </a>
        <ul id="menu">
          <li onClick={() => settoggle(false)}>
            <Link to="/">الصفحة رئيسية</Link>
          </li>
          <li className="toggler4">
            <i className="fa-solid fa-caret-down"></i>
            <a href="#">الخدمات</a>

            <div className="menu4">
              <li>
                <a href="#">التجار</a>
                <i className="fa-solid fa-comments-dollar"></i>
              </li>
              <li>
                <Link to="/services/technicien">تقني صيانة</Link>
                <i className="fa-solid fa-wrench"></i>
              </li>
              <li>
                <a href="#">خدمات منزلية</a>
                <i className="fa-solid fa-broom"></i>
              </li>
              <li>
                <a href="#">كراء</a>
                <i className="fa-solid fa-house"></i>
              </li>
              <li>
                <a href="#">بناء</a>
                <i className="fa-solid fa-person-digging"></i>
              </li>
              <li>
                <a href="#">مواصلات</a>
                <i className="fa-solid fa-car"></i>
              </li>
            </div>
          </li>
          <li>
            <a href="#">الدعم الفني</a>
          </li>
          <li>
            <a href="#">التواصل</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
