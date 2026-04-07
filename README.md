# 🎲 Dice Battle

## 📌 Tópico

Desarrollo de una aplicación web interactiva: juego RPG de combate por turnos basado en mecánicas de azar y estrategia mediante equipamiento.

## 👥 Miembros del proyecto

* Bazzana Alejo
* Champredonde Juan Martin

## 🛠️ Gestión del proyecto

* Herramienta: Trello
* Tablero: [trello.com/b/xpv48cPh/dice-battle](https://trello.com/b/xpv48cPh/dice-battle)

## 🧩 Descripción general del proyecto

**Dice Battle** es un juego web multijugador de combate por turnos en el que dos jugadores se enfrentan utilizando mecánicas basadas en tiradas de dados y decisiones estratégicas a través del equipamiento.

En cada ronda, ambos jugadores realizan una tirada de dos dados.

* La suma de los dados del atacante determina su **ataque**.
* La suma de los dados del defensor determina su **defensa**.

Si el valor de ataque supera al de defensa, el daño infligido será igual a la diferencia entre ambos valores.

El sistema incorpora mecánicas adicionales:

* **Golpe crítico**: si el atacante obtiene dobles en su tirada.
* **Contragolpe**: si el defensor obtiene dobles en su tirada.

Al finalizar cada ronda, los jugadores reciben una opción aleatoria de equipamiento (casco, peto, guantes o botas), que otorga mejoras a las estadísticas del personaje.

Las estadísticas se dividen en:

* **Primarias**: vida máxima, ataque, defensa.
* **Secundarias**: regeneración de vida, robo de vida, daño verdadero, multiplicador crítico y multiplicador de contraataque.

El objetivo del juego es reducir los puntos de vida del oponente a cero mediante la combinación de azar (dados) y estrategia (elección de equipamiento y optimización de estadísticas).

El alcance del proyecto contempla:

* Lógica de combate por turnos
* Sistema de tiradas de dados
* Sistema de equipamiento aleatorio
* Gestión de estadísticas del jugador
* Interfaz web para interacción entre jugadores

No se contempla en esta etapa el desarrollo de mecánicas complejas fuera del sistema de combate principal.
