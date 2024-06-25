import css from './styles.module.css';

export function ClanPersonalization() {
  return (
    <div className={css.wrapper}>
      <div className={css.page}>
        <h2 className={css.name}>PERSONALIZATION</h2>
        <div className={css.avatar}>
          <img className={css.border} />
          <img className={css.ellipse} />
          <img className={css.shape} />
          <img className={css.figure} />
        </div>
        <div className={css.editBlock}>
          <div className={css.block}>
            <div className={`${css.editElem} ${css.active}`}>
              <img className={css.shape0} />
            </div>
            <div className={css.editElem}>
              <img className={css.shape1} />
            </div>
            <div className={css.editElem}>
              <img className={css.shape2} />
            </div>
            <div className={css.editElem}>
              <img className={css.shape3} />
            </div>
            <div className={css.editElem}>
              <img className={css.shape4} />
            </div>
          </div>
          <div className={css.block}>
            <div className={css.editElem}>
              <img className={css.color0} />
            </div>
            <div className={css.editElem}>
              <img className={css.color1} />
            </div>
            <div className={css.editElem}>
              <img className={css.color2} />
            </div>
            <div className={`${css.editElem} ${css.active}`}>
              <img className={css.color3} />
            </div>
            <div className={css.editElem}>
              <img className={css.color4} />
            </div>
          </div>
          <div className={css.block}>
            <div className={`${css.editElem} ${css.active}`}>
              <img className={css.figure0} />
            </div>
          </div>
        </div>
        <div className={css.save}>
          Save changes
        </div>
        <div className={css.cancel}>
          cancel
        </div>
      </div>
    </div>
  );
}
