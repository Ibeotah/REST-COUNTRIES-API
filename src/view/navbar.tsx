import { Container } from "../components/container/container";
import styles from "../styles/navbar.module.css";
import { MoonOutlined } from "@ant-design/icons";
export const Navbar = () => {
    return (
      <Container className={styles.container}>
        <Container className={styles.first_container}>
          <div className={styles.where}>Where in the world?</div>
          <Container isNav={false} className={styles.dark_mode_container}>
            {/* <div> */}
            <MoonOutlined className={styles.MoonOutlined} />
            {/* </div> */}
            <div className={styles.dark_mode}>Dark Mode</div>
          </Container>
        </Container>
      </Container>
    );
};
