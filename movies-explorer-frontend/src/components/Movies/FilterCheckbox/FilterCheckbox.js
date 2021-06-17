import './FilterCheckbox.css';

export default function FilterCheckbox(props) {

  return (
    <div className={`filter-checkbox__element ${props.isCheckboxOn ? "filter-checkbox__element_checked" : ""}`}>
      <input className={`filter-checkbox__surrounding-border ${props.isCheckboxOn 
        ? "filter-checkbox__surrounding-border_checked" 
        : ""
        }`} type="checkbox" onClick={props.checkboxClicked}/>
    </div>
  )
}