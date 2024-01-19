/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./About.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function About() {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div id="About" className={`${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1>خدماتنا</h1>
      <div className="box">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            769: {
              slidesPerView: 3.5,
            },
          }}
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper">
          {" "}
          <SwiperSlide>
            <h5>بستاني</h5>
            <img src="../../assets/listservice/gardener.jpg" alt="Gardener" />
          </SwiperSlide>
          <SwiperSlide>
            <h5>كهربائي</h5>
            <img
              src="../../assets/listservice/electrician.jpg"
              alt="electrician"
            />
          </SwiperSlide>
          <SwiperSlide>
            <h5>رسام منازل</h5>
            <img
              src="../../assets/listservice/professional-house-painter.jpg"
              alt="plombier"
            />
          </SwiperSlide>
          <SwiperSlide>
            <h5>نجار</h5>
            <img
              src="../../assets/listservice/منجرة-فى-راس-الخيمة.jpg"
              alt="plombier"
            />
          </SwiperSlide>
          <SwiperSlide>
            <h5>ميكانيكي</h5>
            <img
              src="../../assets/listservice/Mecanicien-auto.jpg"
              alt="plombier"
            />
          </SwiperSlide>
          <SwiperSlide>
            <h5>سباك</h5>
            <img src="../../assets/listservice/plombier.webp" alt="plombier" />
          </SwiperSlide>
          <SwiperSlide>
            <h5>معينة منزلية</h5>
            <img
              src="../../assets/listservice/rouver-femme-de-menage-en-Tunisie-1024x683.jpeg"
              alt="femme-de-menage"
            />
          </SwiperSlide>
          <SwiperSlide>
            <h5>تقني تبريد و تسخين</h5>
            <img
              src="../../assets/listservice/ou-placer-sa-clim.webp"
              alt="femme-de-menage"
            />
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
      <div className="about">
        <h2>
          منصة مراجعة تعاونية
          <img
            src="../../assets/Screenshot 2023-11-23 142257.png"
            alt="iconprofile"
            className="iconprofile"
          />{" "}
          مفتوحة لكل مزود خدمة/سلع عبر العديد من المهن التي تقوم بإعلام وتحذير
          <img
            src="../../assets/Screenshot 2023-11-23 142328.png"
            alt="review"
            className="review"
          />{" "}
          . اوتوفير وقت المراجعة والتفاعل مع العملاء
        </h2>
      </div>
      <div className="concept">
        <div>
          <div>
            <h3>فكرة الموقع</h3>
            <p>
              نحن "كعملاء" نقدم بشكل عام تعليقات أو مراجعات للخدمات أو المكان أو
              الشراء لأننا نؤمن بأن مشاركة تجربتنا القيمة معهم سيمكنهم من اختيار
              خيار أفضل عندما يحتاجون إليه. مع الآخرين سوف يساعد البضائع التي
              نحن عليها بالعكس، أراد عميلنا ابتكار منصة يمكنه من خلالها مساعدة
              جميع مقدمي الخدمة في التعرف على عملائهم قبل العمل أو التعاون معهم!
            </p>
          </div>
          <img
            src="../../assets/7-key-benefits-of-mobile-banking-in-2022.webp"
            alt="bankig"
          />
        </div>
        <div>
          <img src="../../assets/65400a6d356802a56be7dee3.webp" alt="bankig" />
          <div className="reverse">
            <h3> مقدمي الخدمة</h3>
            <p>
              <br /> المقاولون والمقاولين من الباطن في صناعة البناء والتشييد
              (السباكين، والكهربائيين، والمبلطين، والنجارين، وطبقات الطوب، أو أي
              خدمة تركيب أخرى موجهة للبناء وما إلى ذلك)
              <br />. موردي المواد الصغيرة والمتوسطة (شركات تقديم الطعام، إدارة
              حفلات الزفاف، فناني الأداء، تجار المواد الغذائية بالجملة، إلخ).{" "}
              <br /> موردو السلع والخدمات الطبية (أخصائيي العلاج الطبيعي، وتقويم
              العمود الفقري، ومعالجي التجميل، والتدليك العلاجي، والجراح)
              <br /> مقدمي خدمات الصيانة المنزلية
            </p>
          </div>
        </div>
      </div>
      <div className="JoinUs">
        <div className="imgleft">
          <span></span>

          <img src="../../assets/taezazeza30x1024.png" />
        </div>
        <div className="leftjoin">
          <h3>اكتشف تطبيقنا الجديد لخدمات متعددة</h3>
          <p>
            انضم إلينا اليوم واكتشف عالمًا جديدًا من الراحة والجودة. لا تفوت
            الفرصة! شكرًا لثقتكم بنا.
          </p>
          <Link to="/signup">
            {" "}
            <button>أنضمام</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
