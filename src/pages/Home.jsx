import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page home">
      <section className="hero">
        <h1>Visualize your Notes.</h1>
        <p className="hero-subtitle">
          Timelines is a free, open-source app for creating <br></br>
          interactive timelines for worldbuilding and history.
        </p>
        <div className="hero-buttons">
          <Link to="/download" className="btn btn-primary">Download Alpha</Link>
          <a href="https://github.com/sreegjl/timelines" className="btn btn-secondary">View On Github</a>
        </div>
        <div className="hero-demo">
          <img src={`${import.meta.env.BASE_URL}timeline.png`} alt="Timelines app screenshot" />
        </div>
      </section>

      <section className="hero-video">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/-_5jMts4rGY?si=HC0bnAt6j8_Wbgaq" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </section>

      <section className="showcase">
        <div className="showcase-item">
          <div className="showcase-text">
            <h2>Add Events, Spans, and Eras</h2>
            <p>Place events at specific points in time, define spans that stretch across periods, and organize everything into eras for a clear, structured timeline.</p>
          </div>
          <div className="showcase-image">
            <img src={`${import.meta.env.BASE_URL}events.png`} alt="Events, spans, and eras" />
          </div>
        </div>

        <div className="showcase-item reverse">
          <div className="showcase-text">
            <h2>Create & Link Elements to Markdown Notes</h2>
            <p>Attach .md notes to any timeline element. Set your notes folder to an existing vault to keep your research, lore, and context right alongside your timeline.</p>
          </div>
          <div className="showcase-image">
            <img src={`${import.meta.env.BASE_URL}notes.png`} alt="Markdown notes linked to timeline elements" />
          </div>
        </div>

        <div className="showcase-item">
          <div className="showcase-text">
            <h2>Full Customization</h2>
            <p>Customize colors, fonts, plugins, and layouts to match your style. Make every timeline uniquely yours with a flexible theming system.</p>
          </div>
          <div className="showcase-image">
            <img src={`${import.meta.env.BASE_URL}themes.png`} alt="Theme customization options" />
          </div>
        </div>

      </section>

      <section className="home-download">
        <div className="home-download-content">
          <div className="home-download-card home-download-open-source-card">
            <div className="home-download-text">
              <h2>Built in the Open</h2>
              <p>
                Timelines is fully open source. You can inspect the code, report issues,
                suggest features, and contribute improvements.
              </p>
              <a href="https://github.com/sreegjl/timelines" className="home-download-card-link">View On Github</a>
            </div>
          </div>
          <div className="home-download-card">
            <img src={`${import.meta.env.BASE_URL}icon.png`} alt="Timelines app icon" className="home-download-icon" />
            <h2>timelines</h2>
            <Link to="/download" className="home-download-card-link">Get the App</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
