// scss
import "./Tags.scss";

export default function Tags({ handleClickTags, tagActivated }) {
  return (
    <div className="Tags">
      <button
        className={"tags " + (tagActivated === "body" && "tag-activated")}
        onClick={() => handleClickTags("bodyTagClicked")}
      >
        Body
      </button>
      <button
        label="Response"
        variant="outlined"
        className={"tags " + (tagActivated === "response" && "tag-activated")}
        onClick={() => handleClickTags("responseTagClicked")}
      >
        Response
      </button>
    </div>
  );
}
