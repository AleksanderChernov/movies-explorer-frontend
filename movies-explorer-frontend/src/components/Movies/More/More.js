import './More.css';

export default function More(props) {
  return(
    <div className="more">
      <button className="more__button" onClick={props.showMore}>Ещё</button>
    </div>
  )
}