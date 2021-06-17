import './AboutProject.css';

export default function Promo() {
  return(
    <div className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <hr className="about-project__separator"/>
      <div className="about-project__stages-wrapper">
        <div className="about-project__stages">
          <h2 className="about-project__stages-title">Дипломный проект включал 5 этапов</h2>
          <article className="about-project__text-block">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</article>
        </div>
        <div className="about-project__stages">
          <h2 className="about-project__stages-title">На выполнение диплома ушло 5 недель</h2>
          <article className="about-project__text-block">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</article>
        </div>
      </div>
      <div className="about-project__timeline-block">
        <div className="about-project__timeline-columns">
          <p className="about-project__progress-block about-project__progress-block_left">1 неделя</p>
          <p className="about-project__underline">Back-end</p>
        </div>
        <div className="about-project__timeline-columns">
          <p className="about-project__progress-block about-project__progress-block_right">4 недели</p>
          <p className="about-project__underline">Front-end</p>
        </div>
      </div>
    </div>
  )
}