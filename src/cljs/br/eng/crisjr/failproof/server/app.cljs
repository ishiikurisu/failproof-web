(ns br.eng.crisjr.failproof.server.app
    (:require [goog.net.cookies]))

;; COOKIES
(defn get-cookie
    [tag]
    (.get goog.net.cookies tag nil))

(defn set-cookie!
    [tag value]
    (.set goog.net.cookies tag value -1))


;; MAIN
(defn ^:export store [tag checklist]
    (set-cookie! tag checklist))

(defn ^:export home []
    (let [data (get-cookie "checklist")]
      (.log js/console (if (nil? data) "nothing found" data))))
