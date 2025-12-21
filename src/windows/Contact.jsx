import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="https://media.licdn.com/dms/image/v2/C5603AQHs92VsmumUAA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1609921126164?e=1767830400&v=beta&t=hXf4rzydwP4nyZbX2RvGlYfApqZpbWxokMyaxD8VsXc"
          alt="Vishnu"
          className="w-20 rounded-full"
        />
        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <p>vvarthan7@gmail.com</p>
        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
