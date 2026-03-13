import img1 from "../assets/phones/1.jpg";
import img2 from "../assets/phones/2.jpg";
import img3 from "../assets/phones/3.jpg";
import img4 from "../assets/phones/4.jpg";
import img5 from "../assets/phones/5.jpg";

const phones = [img1, img2, img3, img4, img5];

export default function Hero() {
  return (
    <>

      <style>{`
        .hero {
          min-height: 100vh;
          background: var(--bg);

          display: flex;
          align-items: flex-start; /* move phones toward top */
          justify-content: center;

          gap: 20px;
          padding: 20px 32px 0; /* reduced top space */

          box-sizing: border-box;
          overflow: hidden;
        }

        .phone {
          flex: 1;
          height: 78vh;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);

          transition:
            transform 0.3s cubic-bezier(0.34,1.3,0.64,1),
            box-shadow 0.3s ease;
        }

        .phone:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 48px rgba(0,0,0,0.18);
        }

        .phone img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* responsive */

        @media (max-width: 900px) {
          .hero {
            flex-direction: column;
            align-items: center;
            padding-top: 10px;
          }

          .phone {
            width: 80%;
            height: 60vh;
          }
        }
      `}</style>

      <section className="hero">
        {phones.map((src, i) => (
          <div key={i} className="phone">
            <img src={src} alt={`design ${i + 1}`} />
          </div>
        ))}
      </section>
    </>
  );
}