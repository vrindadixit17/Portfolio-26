import img1 from "../assets/phones/1.jpg"
import img2 from "../assets/phones/2.jpg"
import img3 from "../assets/phones/3.jpg"
import img4 from "../assets/phones/4.jpg"
import img5 from "../assets/phones/5.jpg"

export default function Hero() {

  const phones = [img1, img2, img3, img4, img5]

  return (
    <section className="flex justify-center gap-8 mt-20">

      {phones.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="app design"
          className={`w-44 rounded-[30px] shadow-xl transition hover:-translate-y-3 ${
            index % 2 === 0 ? "rotate-[-3deg]" : "rotate-[3deg]"
          }`}
        />
      ))}

    </section>
  )
}