# LinguaRise

## Temat  
**Aplikacja webowa do nauki języków obcych**, umożliwiająca interaktywną naukę poprzez rozmowy z chatbotem oraz analizę poprawności wymowy użytkownika.

## Opis projektu
System wspiera naukę języka poprzez różne metody, takie jak:  
- 🎧 Słuchanie i powtarzanie fraz  
- ✍️ Pisanie ze słuchu  
- 📝 Uzupełnianie luk w zdaniach  
- 🖼️ Nauka słownictwa poprzez obrazki  
- 💬 Swobodna konwersacja z chatbotem dostosowaną do poziomu użytkownika

Postęp użytkownika jest na bieżąco zapisywany, dzięki czemu możliwe jest kontynuowanie nauki w dowolnym momencie.

---

## Członkowie zespołu i podział zadań  
### 👨‍💻 **Piotr Równicki**
- [x] Implementacja podstaw backendu  
- [x] Projektowanie i zarządzanie bazą danych
- [x] Autoryzacja i autentykacja użytkownika
- [x] Rozwój funkcjonalności słuchania i powtarzania fraz  
- [x] Implementacja ćwiczeń pisania ze słuchu

### 👨‍💻 Dawid Rudnicki  
- [x] Implementacja podstaw frontendu  
- [x] Integracja frontendu z backendem  
- [x] Rozwój funkcjonalności uzupełniania luk w zdaniach  
- [x] Nauka słownictwa poprzez obrazki

### 🤝 Zadania wspólne  
- [x] Realizacja funkcjonalności swobodnej konwersacji z chatbotem  
- [x] Implementacja mniejszych funkcji wspierających projekt
- [x] Interfejs użytkownika

---

## Architektura systemu  
📌 **Frontend**: Aplikacja ReactJS komunikująca się z backendem poprzez REST API  
📌 **Backend**: Aplikacja .NET Core zarządzająca logiką biznesową i bazą danych  
📌 **Baza danych**: Microsoft SQL Server do przechowywania danych użytkowników i postępów w nauce  
📌 **Usługi Azure**: Integracja z inteligentnymi usługami do analizy wymowy i interakcji z chatbotem  

---

## Usługi Azure  
☁️ **Azure Speech to Text** – analiza poprawności wymowy użytkownika  
☁️ **Azure Text to Speech** – generowanie odpowiedzi głosowych  
☁️ **Azure Bot Service** – chatbot do nauki języka  
☁️ **Azure Microsoft Entra** – zarządzanie kontami użytkowników  

---

## Struktura bazy danych
![Schemat bazy danych](Resources/database.png)

---

## Użyte technologie oraz biblioteki  
### Backend:  
- 🟣 .NET Core  
- 🔵 Entity Framework  
- 🔵 ASP.NET Web API  
- 🔵 Azure SDK

### Frontend:  
- 🟡 ReactJS

### Baza danych:  
- 🗄️ Microsoft SQL Server

---

## Interfejs użytkownika  

---

## Funkcjonalności  
✔️ Logowanie lokalne i przez Microsoft Entra  
✔️ Interaktywna nauka języka poprzez różne metody  
✔️ Analiza wymowy użytkownika  
✔️ Personalizowane kursy i śledzenie postępów  
✔️ Integracja z chatbotem językowym  

---

## Instrukcja uruchomienia  

### Backend  
1. Zainstaluj .NET SDK  
2. Skonfiguruj Microsoft SQL Server  
3. Wykonaj migracje bazy danych:  
   a) Dodanie migracji:  
      ```sh
      Add-Migration InitialCreate
      ```
   b) Utworzenie bazy i schematu:  
      ```sh
      Update-Database
      ```
4. Uruchom backend:  
   ```sh
   dotnet run --project LinguaRise.Api
   
### Frontend
1. Zainstaluj Node.js oraz npm
2. Pobierz zależności:
   ```sh
   npm install
3. Uruchom frontend:
   ```sh
   npm start
