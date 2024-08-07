import { ERROR, INFO } from '@constants/message';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  background: {
    zIndex: '1',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'rgba( 0, 0, 0, 0.3 )',
    cursor: 'auto',
  },
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
  },
  close: {
    float: 'right',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#bdbdbd',
  },
  text: {
    margin: '30px 10px',
  },
  bold: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  ie: {
    fontSize: '13px',
    marginTop: '20px',
  },
});

const UnmodifyModal = ({ setter }: UnmodifyModalProps) => {
  const closeModal = () => setter(false);

  return (
    <div {...stylex.props(styles.background)}>
      <div {...stylex.props(styles.container)}>
        <div onClick={closeModal} {...stylex.props(styles.close)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div {...stylex.props(styles.text)}>
          <span {...stylex.props(styles.bold)}>{ERROR.DIARY_CANT_EDIT}</span>
          <br />
          <span {...stylex.props(styles.ie)}>{INFO.DIARY_EDIT_INFO}</span>
        </div>
      </div>
    </div>
  );
};

export default UnmodifyModal;
