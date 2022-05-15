// redux
import { useSelector} from "react-redux";
// mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// scss
import './Chips.scss'

export default function Chips({ handleClickChipTags, tagActivated }) {

  return (
    <div className="Chips">
        <button
          className={'tags ' + (tagActivated === 'body' && 'tag-activated') }
          onClick={() => handleClickChipTags('bodyTagClicked')}
        >
          Body
        </button>
        <button
          label="Response"
          variant="outlined"
          className={'tags ' + (tagActivated === 'response' && 'tag-activated') }
          onClick={() => handleClickChipTags('responseTagClicked')}
        >
          Response
        </button>
      
    </div>
  );
}
