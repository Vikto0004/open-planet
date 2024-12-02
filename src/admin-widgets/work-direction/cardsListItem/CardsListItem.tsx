import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { MouseEvent, useState } from "react";

import { useDeleteCard } from "@/admin-shared/hooks";
import css from "@/admin-widgets/work-direction/CardsList/list.module.css";

interface IListItemProps {
  primaryText?: string;
  secondaryText?: string;
  id: string;
}

const CardsListItem = ({
  primaryText,
  secondaryText,
  id,
}: IListItemProps) => {
  const { mutate, isPending } = useDeleteCard();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.outerText === "Видалити") {
      mutate(id);
    }
    setAnchorEl(null);
  };

  return (
    <ListItem
      secondaryAction={
        <div className={css.secondaryAction}>
          <Link href={`projects/${id}`}>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              disabled={isPending}
            >
              Редагувати
            </Button>
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ margin: "0 5px 0 15px" }}
          />
          <Tooltip title="Видалити">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleClick}
              id="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      }
      divider={true}
    >
      <ListItemText
        primary={primaryText ? primaryText : "Заголовку немає"}
        secondary={secondaryText ? secondaryText : "Data"}
      />
      <Menu
        id="delete"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        MenuListProps={{
          sx: {
            padding: "0",
            borderRadius: "4px",
          },
        }}
      >
        <MenuItem onClick={handleClose} disabled={isPending}>
          Видалити
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export default CardsListItem;
