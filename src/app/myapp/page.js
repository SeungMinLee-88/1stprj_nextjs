'use client'
import "../globals.css";
import '../../../node_modules/semantic-ui-css/semantic.min.css';
import Footer from "../component/Footer";
import Top from "../component/Top";

export default function MyApp( Component, pageProps ) {
  return (
    <div style={{ width: 1000, margin: "0 auto" }}>
      <Top />
      {/* <Component {...pageProps} /> */}
      <Footer />
    </div>
  );
}

/**
 * 페이지 전환시 레이아웃을 유지할 수 있습니다.
페이지 전환시 상태값을 유지할 수 있습니다.
componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있습니다.
추가적인 데이터를 페이지로 주입시켜주는게 가능합니다.
글로벌 CSS 를 이곳에 선언합니다.
 * 
 */