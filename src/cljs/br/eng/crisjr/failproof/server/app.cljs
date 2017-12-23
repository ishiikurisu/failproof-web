(ns br.eng.crisjr.failproof.server.app
    (:require [br.eng.crisjr.failproof.server.cookie :as cookie]))

(defn ^:export hi []
    (js/alert "cheers, love! calvary is coming!"))

(defn ^:export check [what]
    (.log js/console (str "your cookie is <" (cookie/get-cookie what) ">")))

(defn ^:export store [tag checklist]
    (cookie/set-cookie! tag checklist))

(defn ^:export drawindex []
    (let [data (cookie/get-cookie "checklists")]
      (.log js/console data)))
