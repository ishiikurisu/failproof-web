(ns br.eng.crisjr.failproof.server.app
    (:require [br.eng.crisjr.failproof.server.cookie :as cookie]))

(defn ^:export hi []
    (js/alert "cheers, love! calvary is coming!"))

(defn ^:export check []
    (js/alert (str "your cookie is <" (cookie/fix-cookie-value (cookie/get-cookie "nope")) ">")))

(defn ^:export add []
    (do (cookie/set-cookie! "count" 10)
        (check)))