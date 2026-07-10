<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterBar from './components/FooterBar.vue'
import BackToTop from './components/BackToTop.vue'
import CommandPalette from './components/CommandPalette.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <PortfolioSection />
    <EducationSection />
    <ContactSection />
  </main>
  <FooterBar />
  <BackToTop />
  <CommandPalette />
</template>
