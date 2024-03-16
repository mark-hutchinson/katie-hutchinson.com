import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import data from './data/website.json'

import {Section} from "./components/Section";
import {Welcome} from "./components/Welcome";
import {Bio} from "./components/Bio";
import {NavBar} from "./components/NavBar";
import {ContentItems} from "./components/ContentItems";
import {ContentItem} from "./components/ContentItem";
import {ContactForm} from "./components/ContactForm";
import {FullWidthCarousel} from "./components/FullWidthCarousel";


function App() {
  console.log(data)
  return (
    <div className="App">
        <NavBar items={[
          {ref: "welcome", label: "Welcome"},
          {ref:"about", label: "About"},
          {ref:"services", label: "Services"},
          {ref: "bio", label: "Bio"},
          {ref: "testimonials", label: "Success Stories"},
          {ref: "contact", label: "Contact"}
        ]}/>
        <Section id="welcome">
          <Welcome data={data.welcome}/>
        </Section>
      <Section id="about">
        <ContentItem data={data.mission}/>
        <br/><br/>
        <FullWidthCarousel data={data.carousel}/>
      </Section>
      <Section id="services">
        <ContentItems data={data.services}/>
      </Section>
      <Section id="bio">
        <Bio data={data.bio}/>
      </Section>
      <Section id="testimonials">
        <ContentItems data={data.testimonials}/>
      </Section>
      <Section id="contact">
        <ContactForm data={data.contact}/>
      </Section>
    </div>
  );
}

export default App;
