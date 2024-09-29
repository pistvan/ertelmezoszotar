FROM ubuntu:focal AS hunspell-library

WORKDIR /

RUN apt update \
	&& apt install -y \
		# https://ubuntuforums.org/showthread.php?t=886192
		gawk \
		git \
		m4 \
		make \
		recode \
	&& git clone https://github.com/laszlonemeth/magyarispell \
	&& cd magyarispell \
	&& make myspell



FROM solr:9.0.0

COPY --chown=solr:solr --from=hunspell-library /magyarispell/hu_HU_u8_gen.* /var/solr/data/meszotar/

COPY --chown=solr:solr assets /var/solr/data/meszotar
