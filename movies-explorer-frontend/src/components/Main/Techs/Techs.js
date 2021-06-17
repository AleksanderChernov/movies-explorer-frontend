import './Techs.css';

export default function Techs() {
  return(
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__block">
        <h2 className="techs__main-header"> 7 технологий </h2>
        <article className="techs__article">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </article>
        <div className="techs__stack-list">
          <div className="techs__stack-item">
            <p className="techs__stack-name">HTML</p>
          </div>
          <div className="techs__stack-item">
            <p className="techs__stack-name">CSS</p>
          </div>
          <div className="techs__stack-item">
            <p className="techs__stack-name">JS</p>
          </div>
          <div className="techs__stack-item">
            <p className="techs__stack-name">React</p>
          </div>
          <div className="techs__stack-item">
            <p className="techs__stack-name">Git</p>
          </div>
          <div className="techs__stack-item">
            <p className="techs__stack-name">Express.js</p>
          </div>
          <div className="techs__stack-item">
            <p className="techs__stack-name">mongoDB</p>
          </div>
        </div>
      </div>
    </section>
  )
}