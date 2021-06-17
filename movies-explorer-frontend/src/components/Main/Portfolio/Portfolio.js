import './Portfolio.css';

export default function Portfolio() {
  return(
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__link-cell">
          <a className="portfolio__links" href="https://github.com/AleksanderChernov/how-to-learn">Статичный сайт</a>
          <a className="portfolio__arrow" href="https://github.com/AleksanderChernov/how-to-learn">&#8599;</a>
      </div>
      <hr className="portfolio__separator"/>
      <div className="portfolio__link-cell">
          <a className="portfolio__links" href="https://aleksanderchernov.github.io/russian-travel/">Адаптивный сайт</a>
          <a className="portfolio__arrow" href="https://aleksanderchernov.github.io/russian-travel/">&#8599;</a>
      </div>
      <hr className="portfolio__separator"/>
      <div className="portfolio__link-cell">
          <a className="portfolio__links" href="https://github.com/AleksanderChernov/mesto">Одностраничное приложение</a>
          <a className="portfolio__arrow" href="https://github.com/AleksanderChernov/mesto">&#8599;</a>
      </div>
    </section>
  )
}