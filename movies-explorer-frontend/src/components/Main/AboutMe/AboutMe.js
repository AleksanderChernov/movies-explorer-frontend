import './AboutMe.css';
import portrait from '../../../images/Author/author.jpg'

export default function AboutMe() {
  return(
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__innards-wrapper">
        <img className="about-me__portrait" src={portrait} alt='Портрет автора'/>
        <article className="about-me__text-wrapper">
          <h2 className="about-me__name">Александр</h2>
          <h3 className="about-me__speciality">Web-разработчик, 27 лет</h3>
          <article className="about-me__text-block">Хочу развиваться в IT-сфере, в особенности Front-end, по причине того что вырос в семье художников, художником сам нее стал но тяга к прекрасному и созданию нового осталась. Так-же приходилось помогать с сайтами друзьям и знакомым, так и усилил свою любовь к этой деятельности. Хочется создавать работоспособные и эстетичные продукты.{/*  В дальнейшем собираюсь объединить свое образование с IT. Знаю английский язык на уровне C1, датский язык с немецким без практики заметно снизились. Сам увлекаюсь историей, психологией, философией, треккингом, кулинарией, тренируюсь рукопашному бою, собираю виниловые пластинки. */}</article>
          <div className="about-me__contacts-block">
            <a className="about-me__contacts" href="none">Facebook</a>
            <a className="about-me__contacts" href="https://github.com/AleksanderChernov">GitHub</a>
          </div>
        </article>
      </div>
    </section>
  )
}