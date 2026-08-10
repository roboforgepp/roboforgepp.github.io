---
title: Nadstawa — tracker ze skanerem otoczenia
summary: Skaner LiDAR na obrotowej głowicy. Buduje mapę otoczenia i śledzi wybrany obiekt, żeby platforma mogła jechać sama zamiast pod pilotem.
category: Nadstawa
status: planowany
date: 2026-06-10
featured: false
order: 60
tags:
  - LiDAR
  - mapowanie
  - percepcja
visual: lidar
downloads: []
placeholder: true
draft: false
---

## Co to jest

Nadstawa percepcyjna — oczy robota. Skanuje otoczenie, składa z pomiarów mapę
i wskazuje sterownikowi, gdzie jest przeszkoda, a gdzie wolna droga.

## Jak działa

Obracający się dalmierz zbiera chmurę punktów w płaszczyźnie wokół robota. Kolejne
skany są składane w mapę, a na jej podstawie planowana jest trasa. Ten sam strumień
danych zasila tryb śledzenia wybranego obiektu.

## Status prac

Faza doboru sprzętu i budowy stanowiska testowego. Najpierw mapowanie w miejscu,
potem jazda z omijaniem przeszkód.
