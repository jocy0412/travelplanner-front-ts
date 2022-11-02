import Header from "../common/Header";
import Footer from "../common/Footer";

const Sign = () => {
    return (
        <>
            <Header />
            <div className="box__sign">
                <div className="section">
                    <div className="box__input">
                        <input type="text" placeholder="ID(아이디 또는 이메일)" title="id" name="id" />
                        <input type="password" placeholder="비밀번호" title="password" name="password" />
                        <input type="password" placeholder="비밀번호 확인" title="password2" name="password2" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Sign;
