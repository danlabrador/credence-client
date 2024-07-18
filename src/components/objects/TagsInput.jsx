import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";
import debounce from "lodash.debounce";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
  }
}));

export default function TagsInput({ selectedTags, placeholder, tags, initialTags, ...other }) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(initialTags || []);
  const [initTagsChecked, setInitTagsChecked] = useState (false);

  useEffect(() => {
    if (!initTagsChecked && initialTags && initialTags.length !== selectedItem.length) {
      setSelectedItem(initialTags);
      setInitTagsChecked(true);
    }
  }, [initialTags]);

  useEffect(() => {
    if (tags && tags.length !== selectedItem.length) {
      setSelectedItem(tags);
    }
  }, [tags]);

  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Enter") {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(event.target.value.trim());

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue("");
    }
    if (selectedItem.length && !inputValue.length && event.key === "Backspace") {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }, [inputValue.length, selectedItem]);

  const handleChange = useCallback((item) => {
    if (!selectedItem.includes(item)) {
      setSelectedItem(prevSelected => [...prevSelected, item]);
      setInputValue("");
    }
  }, [selectedItem]);

  const handleDelete = useCallback((item) => () => {
    setSelectedItem(prevSelected => prevSelected.filter(i => i !== item));
  }, []);

  const handleInputChange = useCallback(debounce((event) => {
    setInputValue(event.target.value);
  }, 300), []);

  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder
          });
          return (
            <div className={classes.container}>
              {selectedItem.map(item => (
                <Chip
                  key={item}
                  tabIndex={-1}
                  label={item}
                  className={classes.chip}
                  onDelete={handleDelete(item)}
                />
              ))}
              <TextField
                InputProps={{
                  onBlur,
                  onChange: event => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus
                }}
                {...other}
                {...inputProps}
                style={{ flex: 1, minWidth: 120 }}
              />
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}

TagsInput.defaultProps = {
  tags: [],
  initialTags: []
};

TagsInput.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  initialTags: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string
};
