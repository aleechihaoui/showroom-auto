import { Component, DOCUMENT, afterNextRender, inject, isDevMode, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faPause, faPlay, faSun } from '@fortawesome/free-solid-svg-icons';

type Theme = 'light' | 'dark';

//decorator that defines the component's metadata
@Component({
  imports: [FontAwesomeModule, DatePipe, UpperCasePipe],
  selector: 'app-head-bar', //nom de la balise HTML pour le composant
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar {
  faMoon = faMoon
  faSun = faSun
  today = new Date()
  theme = signal<Theme>('dark')
  private document = inject(DOCUMENT)

  //musique : le fichier n'existe qu'en local (ng serve), pas sur le site en ligne
  faPlay = faPlay
  faPause = faPause
  hasMusic = isDevMode()
  playing = signal(false)
  private music?: HTMLAudioElement

  constructor() {
    //uniquement dans le navigateur : thème sauvegardé, sinon celui du système
    afterNextRender(() => {
      if (this.hasMusic) this.startMusic()
      const saved = this.document.documentElement.getAttribute('data-theme')
      const prefersLight = typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches
      this.applyTheme(saved === 'dark' || saved === 'light' ? saved : prefersLight ? 'light' : 'dark')
    })
  }

  //essaie de jouer dès l'ouverture ; si le navigateur bloque le son automatique,
  //la musique démarre au premier clic sur la page
  private startMusic() {
    this.music = new Audio('Audio/starboy.mp3')
    this.music.loop = true
    this.music.volume = 0.5
    this.music.play()
      .then(() => this.playing.set(true))
      .catch(() => {
        this.document.addEventListener('click', () => {
          if (!this.playing()) this.toggleMusic()
        }, { once: true })
      })
  }

  toggleMusic() {
    if (!this.music) return
    if (this.playing()) {
      this.music.pause()
      this.playing.set(false)
    } else {
      this.music.play().then(() => this.playing.set(true)).catch(() => {})
    }
  }

  toggleTheme() {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark'
    this.applyTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  private applyTheme(theme: Theme) {
    this.theme.set(theme)
    this.document.documentElement.setAttribute('data-theme', theme)
  }
}
