(ns br.eng.crisjr.failproof.server.cookie
    (:require [clojure.string :as str]
              [goog.net.cookies :as cks]))

(defn get-cookie
    [tag]
    (nth (str/split (filter #(let [key (str/trim (first (str/split %1 #"=")))]
                                 (do ;(js/alert (str "<" %1 ">"))
                                     (= tag key)))
                            (str/split js/document.cookie #";"))
                    #"=")
         1))

(defn set-cookie!
    [tag value]
    (.set goog.net.cookies tag value -1))

; (defn ^:export fix-cookie-value
;     [value]
;     (if (str/ends-with? value "\")")
;         (str/replace value #"\")" "")
;         value))
(defn fix-cookie-value
    [value]
    (str/replace value "\")" ""))
