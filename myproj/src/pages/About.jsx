import "./About.css";
import ritesh from "../images/ritesh.png";
import ruturaj from "../images/ruturaj.png";
import shreyash from "../images/shreyash.jpg";
function About() {
  const teamMembers = [
    {
      name: "Ritesh Gaikwad",
      title: "CDAC Student",
      description:
        "Meet Ritesh, a driven CDAC student with a clear vision for the future. His passion for innovation and his proactive approach are the cornerstones of his contributions. Get to know the mind that helping to shape our next steps.",
      contact: {
        email: "gaikwadritesh0127@gmail.com",
        github: "github.com/Riteshgaikwad",
      },
      photo: ritesh,
      reversed: false,
    },
    {
      name: "Ruturaj Aher",
      title: "CDAC Student",
      description:
        "Meet Ruturaj, a CDAC student with an unwavering drive to excel. His commitment and focused energy are key to pushing boundaries and achieving our goals. Discover the dedication he brings to every project.",
      contact: {
        email: "rsa.cdac.kh@gmail.com",
        github: "github.com/ruturajcdac",
      },
      photo: ruturaj,
      reversed: true,
    },
    {
      name: "Shreyash Agharkar",
      title: "CDAC Student",
      description:
        "Meet Shreyash, a dedicated CDAC student, brings a fresh wave of enthusiasm and a thirst for knowledge to our team. His eagerness to learn and his proactive nature make him a valuable force in our journey.",
      contact: {
        email: "shreyashagharkar47@gmail.com",
        github: "github.com/shsreyyyyy",
      },
      photo: shreyash,
      reversed: false,
    },
  ];

  return (
    <div className="about-container pt-5">
      <h1>About Us</h1>
      <p>
        Welcome to our company! We are a dedicated team committed to providing
        innovative solutions and exceptional services.
      </p>
      <p>
        Our mission is to empower our clients through our expertise and
        collaborative approach. We believe in building strong relationships and
        delivering results that exceed expectations.
      </p>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`person ${member.reversed ? "reversed" : ""}`}
          >
            <div className="info">
              <h3>{member.name}</h3>
              <h4>{member.title}</h4>
              <p>{member.description}</p>
              <ul className="contact-list">
                {member.contact.email && <li>Email: {member.contact.email}</li>}
                {member.contact.github && (
                  <li>
                    GitHub:{" "}
                    <a
                      href={`https://${member.contact.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {member.contact.github.split("/").pop()}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="photo">
              <img src={member.photo} alt={member.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
