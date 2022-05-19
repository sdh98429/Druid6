import * as React from "react";
import { MenuItem, ListItemText, ListItemIcon, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function SideBar({ to, text, Icon }) {
  return (
    <>
      {text === "고객센터" ? (
        <Box
          my={2.5}
          ml={2}
          onClick={() =>
            alert(
              "준비중 입니다. \n문의사항 및 건의사항은 아래 이메일로 연락주세요. \nyuparknji@gmail.com"
            )
          }
        >
          <MenuItem>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <Box ml={1}>
              <ListItemText>{text}</ListItemText>
            </Box>
          </MenuItem>
        </Box>
      ) : (
        <Link to={to}>
          <Box my={2.5} ml={2}>
            <MenuItem>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <Box ml={1}>
                <ListItemText>{text}</ListItemText>
              </Box>
            </MenuItem>
          </Box>
        </Link>
      )}
    </>
  );
}
