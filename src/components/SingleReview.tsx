import "./SingleReview.css";

type Props = {};

export const SingleReview = (props: Props) => {
  return (
    <div className="single-review-wrapper">
      <div className="single-review-info">
        <div className="single-review-pic">
          <img
            className="review-pic"
            src="https://res.cloudinary.com/brnl/image/upload/v1654776837/brnl/Tamiris_Queiroz_Ingles_ixtfql.png"
            alt="foto"
          ></img>{" "}
        </div>
        <div className="single-review-user"> by Pessoa</div>
      </div>
      <div className="single-review-text">
        blablablblablablblablablblablablblablablblablablblablablblablabla
      </div>
    </div>
  );
};
